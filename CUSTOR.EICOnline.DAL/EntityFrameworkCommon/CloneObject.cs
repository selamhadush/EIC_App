using System;
using System.Linq;
using System.Reflection;

namespace CUSTOR.EntityFrameworkCommon
{
  public class CloneObject
  {
    public const BindingFlags MemberAccess =
        BindingFlags.Public | BindingFlags.NonPublic |
        BindingFlags.Static | BindingFlags.Instance | BindingFlags.IgnoreCase;

    /// <summary>
    /// Copies the content of one object to another. The target object 'pulls' properties of the first.
    /// </summary>
    /// <param name="source"></param>
    /// <param name="target"></param>
    public static void CopyObjectData(object source, Object target)
    {
      CopyObjectData(source, target, MemberAccess);
    }

    /// <summary>
    /// Copies the content of one object to another. The target object 'pulls' properties of the first.
    /// </summary>
    /// <param name="source"></param>
    /// <param name="target"></param>
    /// <param name="memberAccess"></param>
    public static void CopyObjectData(object source, Object target, BindingFlags memberAccess)
    {
      CopyObjectData(source, target, null, memberAccess);
    }

    /// <summary>
    /// Copies the content of one object to another. The target object 'pulls' properties of the first.
    /// </summary>
    /// <param name="source"></param>
    /// <param name="target"></param>
    /// <param name="excludedProperties"></param>
    public static void CopyObjectData(object source, Object target, string excludedProperties)
    {
      CopyObjectData(source, target, excludedProperties, MemberAccess);
    }

    /// <summary>
    /// Copies the data of one object to another. The target object 'pulls' properties of the first.
    /// This any matching properties are written to the target.
    ///
    /// The object copy is a shallow copy only. Any nested types will be copied as
    /// whole values rather than individual property assignments (ie. via assignment)
    /// </summary>
    /// <param name="source">The source object to copy from</param>
    /// <param name="target">The object to copy to</param>
    /// <param name="excludedProperties">A comma delimited list of properties that should not be copied</param>
    /// <param name="memberAccess">Reflection binding access</param>
    public static void CopyObjectData(object source, object target, string excludedProperties = null, BindingFlags memberAccess = MemberAccess)
    {
      string[] excluded = null;
      if (!string.IsNullOrEmpty(excludedProperties))
        excluded = excludedProperties.Split(new char[1] { ',' }, StringSplitOptions.RemoveEmptyEntries);

      MemberInfo[] miT = target.GetType().GetMembers(memberAccess);
      foreach (MemberInfo Field in miT)
      {
        string name = Field.Name;

        // Skip over any property exceptions
        if (!string.IsNullOrEmpty(excludedProperties) &&
            excluded.Contains(name))
          continue;

        if (Field.MemberType == MemberTypes.Field)
        {
          FieldInfo SourceField = source.GetType().GetField(name);
          if (SourceField == null)
            continue;

          object SourceValue = SourceField.GetValue(source);
          ((FieldInfo)Field).SetValue(target, SourceValue);
        }
        else if (Field.MemberType == MemberTypes.Property)
        {
          PropertyInfo piTarget = Field as PropertyInfo;
          PropertyInfo SourceField = source.GetType().GetProperty(name, memberAccess);
          if (SourceField == null)
            continue;

          if (piTarget.CanWrite && SourceField.CanRead)
          {
            object SourceValue = SourceField.GetValue(source, null);
            piTarget.SetValue(target, SourceValue, null);
          }
        }
      }
    }
  }
}