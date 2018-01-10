Imports System.IO
Imports System.Net
Imports System.Net.Http
Imports System.Web.Http

Namespace Controllers
    <RoutePrefix("api/hoteloffers")>
    Public Class HotelOffersController
        Inherits ApiController

        <HttpPost, Route("Search")>
        Public Function Search(<FromBody> searchInput As SearchInput) As HttpResponseMessage


            Dim _functionResponse As New FunctionResponse(Of OffersSearchResults)

            Try


                Dim _request As HttpWebRequest
                Dim _httpWebResponse As HttpWebResponse = Nothing
                Dim _reader As StreamReader

                _request = DirectCast(WebRequest.Create("https://offersvc.expedia.com/offers/v2/getOffers?scenario=deal-finder&page=foo&uid=foo&productType=Hotel"), HttpWebRequest)

                _request.Headers = GetRequestHeadersfromSearchInput(searchInput)

                _httpWebResponse = DirectCast(_request.GetResponse(), HttpWebResponse)
                _reader = New StreamReader(_httpWebResponse.GetResponseStream())

                Dim _rawObj As String
                _rawObj = _reader.ReadToEnd()


                Dim _deserializedJSON = Newtonsoft.Json.JsonConvert.DeserializeObject(Of Rootobject)(_rawObj)

                Dim _offers = _deserializedJSON.offers


                Dim _result As New OffersSearchResults With {.OffersResult = _offers, .RecordCount = _offers.Hotel.Count}

                _functionResponse.ReturnedValue = _result

                Return Request.CreateResponse(HttpStatusCode.OK, _result)


            Catch ex As Exception

                Return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, String.Format("Unexpected error was encountered during the processing of your recent request -Error({0})", ex.ToString))

            End Try

        End Function

        Private Function GetRequestHeadersfromSearchInput(searchInput As SearchInput) As WebHeaderCollection

            Dim _listOfRequestHeaders As New WebHeaderCollection
            For Each line In searchInput.SearchLines

                If line.selectedField.fieldType = 2 Then
                    line.searchValue = (Convert.ToDateTime(line.searchValue)).ToString("yyyy-MM-dd")
                End If

                _listOfRequestHeaders.Add(line.selectedField.fieldName, line.searchValue)
            Next

            Return _listOfRequestHeaders
        End Function

    End Class
End Namespace