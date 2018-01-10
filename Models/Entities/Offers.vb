Public Class Rootobject
    Public Property offerInfo As Offerinfo
    Public Property userInfo As Userinfo
    Public Property offers As Offers
End Class

Public Class Offerinfo
    Public Property siteID As String
    Public Property language As String
    Public Property currency As String
End Class

Public Class Userinfo
    Public Property persona As Persona
    Public Property userId As String
End Class

Public Class Persona
    Public Property personaType As String
End Class

Public Class Offers
    Public Property Hotel As List(Of Hotel)
End Class

Public Class Hotel
    Public Property offerDateRange As Offerdaterange
    Public Property destination As Destination
    Public Property hotelInfo As Hotelinfo
    Public Property hotelUrgencyInfo As Hotelurgencyinfo
    Public Property hotelPricingInfo As Hotelpricinginfo
    Public Property hotelUrls As Hotelurls
End Class

Public Class Offerdaterange
    Public Property travelStartDate As List(Of Integer)
    Public Property travelEndDate As List(Of Integer)
    Public Property lengthOfStay As Integer
End Class

Public Class Destination
    Public Property regionID As String
    Public Property associatedMultiCityRegionId As String
    Public Property longName As String
    Public Property shortName As String
    Public Property country As String
    Public Property province As String
    Public Property city As String
    Public Property tla As String
    Public Property nonLocalizedCity As String
End Class

Public Class Hotelinfo
    Public Property hotelId As String
    Public Property hotelName As String
    Public Property localizedHotelName As String
    Public Property hotelDestination As String
    Public Property hotelDestinationRegionID As String
    Public Property hotelLongDestination As String
    Public Property hotelStreetAddress As String
    Public Property hotelCity As String
    Public Property hotelProvince As String
    Public Property hotelCountryCode As String
    Public Property hotelLatitude As Single
    Public Property hotelLongitude As Single
    Public Property hotelStarRating As String
    Public Property hotelGuestReviewRating As Single
    Public Property hotelReviewTotal As Integer
    Public Property hotelImageUrl As String
    Public Property isOfficialRating As Boolean
End Class

Public Class Hotelurgencyinfo
    Public Property airAttachRemainingTime As Integer
    Public Property numberOfPeopleViewing As Integer
    Public Property numberOfPeopleBooked As Integer
    Public Property numberOfRoomsLeft As Integer
    Public Property lastBookedTime As Long
    Public Property almostSoldStatus As String
    Public Property link As String
    Public Property airAttachEnabled As Boolean
End Class

Public Class Hotelpricinginfo
    Public Property averagePriceValue As Single
    Public Property totalPriceValue As Single
    Public Property crossOutPriceValue As Single
    Public Property originalPricePerNight As Single
    Public Property currency As String
    Public Property percentSavings As Single
    Public Property drr As Boolean
End Class

Public Class Hotelurls
    Public Property hotelInfositeUrl As String
    Public Property hotelSearchResultUrl As String
End Class

Public Class OffersSearchResults
    Public Property OffersResult As Offers
    Public Property RecordCount As Integer
End Class