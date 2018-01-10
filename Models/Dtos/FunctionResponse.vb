Imports System.Runtime.Serialization

<DataContract(Name:="FunctionResponseUsing{0}")>
Public Class FunctionResponse(Of T)

#Region "Members"
    Private _ReturnedValue As T = Nothing
    Private _Errors As List(Of String) = Nothing
#End Region

#Region "Properties"
    <DataMember()>
    Public Property ReturnedValue As T
        Get
            Return _ReturnedValue
        End Get
        Set(value As T)
            _ReturnedValue = value
        End Set
    End Property

    <DataMember()>
    Public Property HasErrors As Boolean
        Get
            Return _Errors IsNot Nothing AndAlso _Errors.Count > 0
        End Get
        Set(value As Boolean)

        End Set
    End Property

    <DataMember()>
    Public Property Errors As List(Of String)
        Get
            If (_Errors Is Nothing) Then
                _Errors = New List(Of String)()
            End If
            Return _Errors
        End Get
        Set(value As List(Of String))
            _Errors = value
        End Set
    End Property
#End Region

End Class
