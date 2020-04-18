using SitComTech.Model.Constants;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;

namespace SitComTech.Core.Utils
{
    public static class EnumExtensions
    {
        /// <summary>
        /// Returns DescriptionAttribute Value for given Enum Value
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string GetDescription(this Enum value)
        {
            FieldInfo fieldInfo = value.GetType().GetField(value.ToString());
            if (fieldInfo == null) return null;
            var attribute = (DescriptionAttribute)fieldInfo.GetCustomAttribute(typeof(DescriptionAttribute));
            return attribute.Description;
        }

        /// <summary>
        /// Returns Description Attribute's Value
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string GetDescription<T>(this T value)
        {
            if (value != null)
            {
                FieldInfo fieldInfo = value.GetType().GetField(value.ToString());
                if (fieldInfo == null) return null;
                var attribute = (DescriptionAttribute)fieldInfo.GetCustomAttribute(typeof(DescriptionAttribute));
                return attribute?.Description;
            }
            else return string.Empty;
        }

        /// <summary>
        /// Returns Key and Value
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="description">if true then Value is Description Atttribute's Value. Default False</param>
        /// <returns></returns>
        public static List<EnumModel> GetList<T>(bool description = false)
        {
            List<EnumModel> list = new List<EnumModel>();
            var values = Enum.GetNames(typeof(T));
            var keys = Enum.GetValues(typeof(T)).Cast<int>().ToArray();
            for (int i = 0; i < values.Length; i++)
            {
                var valueDescription = description == true ?
                    ((T)Enum.Parse(typeof(T), values[i])).GetDescription() :
                    values[i];
                list.Add(new EnumModel { Id = keys[i], Name = valueDescription });
            }
            return list.OrderBy(x => x.Name).ToList();
        }

        /// <summary>
        /// Returns Key,Value and Description
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public static List<EnumDescriptionModel> GetList<T>()
        {
            List<EnumDescriptionModel> list = new List<EnumDescriptionModel>();
            var values = Enum.GetNames(typeof(T));
            var keys = Enum.GetValues(typeof(T)).Cast<int>().ToArray();
            for (int i = 0; i < values.Length; i++)
            {
                var valueDescription = ((T)Enum.Parse(typeof(T), values[i])).GetDescription();
                list.Add(new EnumDescriptionModel { Id = keys[i], Name = values[i], Description = valueDescription });
            }
            return list;
        }

        public static List<EnumDescriptionModel> GetList<T>(IEnumerable<T> lst) where T : Enum
        {
            var list = new List<EnumDescriptionModel>();
            foreach (var enumItem in lst)
            {
                list.Add(new EnumDescriptionModel
                {
                    Id = Convert.ToInt16(enumItem),
                    Description = enumItem.GetDescription(),
                    Name = enumItem.ToString()
                });
            }
            return list;
        }

        public static EnumModel GetItem<T>(this T value, bool getDescriptionAsName = false) where T : System.Enum
        {
            var toReturn = new EnumModel();

            toReturn.Id = Convert.ToInt32(value);
            toReturn.Name = getDescriptionAsName ? value.GetDescription() : value.ToString();

            return toReturn;
        }

        public static string ToStringWithSeparator<T>(this IEnumerable<T> lst, string strSeparator)
        {
            string strToReturn = String.Empty;

            if (lst != null)
            {
                foreach (T str in lst)
                {
                    strToReturn += String.Concat(str, strSeparator);
                }
            }

            if (strToReturn.Length > 0 &&
                (strToReturn[strToReturn.Length - 1]).ToString() == strSeparator)
            {
                strToReturn = strToReturn.Substring(0, strToReturn.Length - 1);
            }

            return strToReturn;
        }
    }
}
