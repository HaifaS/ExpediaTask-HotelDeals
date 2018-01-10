
Public Class SearchLine

    Public Property selectedField As selectedField
    Public Property selectedOperator As String
    Public Property searchValue As String
    Public Property searchValue2 As String


End Class

Public Class selectedField
    Public Property fieldName As String
    Public Property fieldDesc As String
    Public Property fieldType As Integer
End Class

Public Class SearchInput
    Public Property SearchLines As New List(Of SearchLine)
    Public Property PageSize As Integer? 'this will be used for server-side pagination 
    Public Property PageIndex As Integer? 'this will be used for server-side pagination 

End Class

