using System.Collections;
using System.Text;

namespace CUSTOR.EntityFrameworkCommon
{
  public class ValidationError
  {
    public string Message { get; set; }

    public string FieldID { get; set; }

    /// <summary>
    /// Error ID
    /// </summary>
    public string ID { get; set; }

    public ValidationError() : base()
    {
    }

    public ValidationError(string message)
    {
      Message = message;
    }

    public ValidationError(string message, string fieldName)
    {
      Message = message;
      FieldID = fieldName;
    }

    public ValidationError(string message, string fieldName, string id)
    {
      Message = message;
      FieldID = fieldName;
      ID = id;
    }
  }

  public class ValidationErrorCollection : CollectionBase
  {
    /// <summary>
    /// Indexer property
    /// </summary>
    public ValidationError this[int index]
    {
      get => (ValidationError)List[index];
      set => List[index] = value;
    }

    public void Add(ValidationError Error)
    {
      List.Add(Error);
    }

    public void Add(string Message, string FieldName = "", string ID = "")
    {
      var error = new ValidationError()
      {
        Message = Message,
        FieldID = FieldName,
        ID = ID
      };
      Add(error);
    }

    public void AddFormat(string Message, string FieldName, string ID, params object[] arguments)
    {
      this.Add(string.Format(Message, arguments), FieldName, ID);
    }

    /// <summary>
    /// Removes the item specified in the index from the Error collection
    /// </summary>
    /// <param name="Index"></param>
    public void Remove(int Index)
    {
      if (Index > List.Count - 1 || Index < 0)
        List.RemoveAt(Index);
    }

    public override string ToString()
    {
      if (Count < 1)
        return "";

      StringBuilder sb = new StringBuilder(128);

      foreach (ValidationError Error in this)
      {
        sb.AppendLine(Error.Message);
      }

      return sb.ToString();
    }

    /// <summary>
    /// Returns an HTML representation of the errors in this collection.
    /// The string is returned as an HTML unordered list.
    /// </summary>
    /// <returns></returns>
    public string ToHtml()
    {
      if (Count < 1)
        return "";

      StringBuilder sb = new StringBuilder(256);
      sb.Append("<ul>\r\n");

      foreach (ValidationError Error in this)
      {
        sb.Append("<li>");
        if (!string.IsNullOrEmpty(Error.FieldID))
          sb.AppendFormat("<a href='#' onclick=\"_errorLinkClick('{0}');return false;\" " +
                        "style='text-decoration:none'>{1}</a>",
                        Error.FieldID.Replace(".", "_"), Error.Message);
        else
          sb.Append(Error.Message);

        sb.AppendLine("</li>");
      }

      sb.Append("</ul>\r\n");
      string script =
      @"    <script>
                    function _errorLinkClick(id) {
                        var $t = $('#' + id).focus().addClass('errorhighlight');
                        setTimeout(function() {
                            $t.removeClass('errorhighlight');
                        }, 5000);
                    }
                </script>";
      sb.AppendLine(script);

      return sb.ToString();
    }
  }
}