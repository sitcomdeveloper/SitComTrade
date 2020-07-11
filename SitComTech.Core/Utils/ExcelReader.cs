using ExcelDataReader;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;

namespace SitComTech.Core.Utils
{
    public static class ExcelReader
    {


        /// <summary>
        /// This will return The data set from excel 
        /// </summary>
        /// <param name="filePath"></param>
        /// <param name="fileExtension"></param>
        /// <param name="SheetName"></param>
        /// <returns></returns>


        public static DataSet ExcelToDataSet(string path, bool IsFirstRowAsColumnNames = true)
        {

            FileStream stream = File.Open(path, FileMode.Open, FileAccess.Read);

            // Choose one of either 1 or 2
            // 1. Reading from a binary Excel file ('97-2003 format; *.xls)
            IExcelDataReader excelReader;

            if (path.EndsWith(".xls"))
                excelReader = ExcelReaderFactory.CreateBinaryReader(stream);
            else if (path.EndsWith(".xlsx"))
            {
                excelReader = ExcelReaderFactory.CreateOpenXmlReader(stream);
            }
            else
            {
                //Throw exception for things you cannot correct
                throw new Exception("The file to be processed is not an Excel file");
            }
            DataSet result;

            if (IsFirstRowAsColumnNames)
            {
                result = excelReader.AsDataSet(new ExcelDataSetConfiguration()
                {

                    UseColumnDataType = true,

                    ConfigureDataTable = (tablereader) => new ExcelDataTableConfiguration()
                    {
                        UseHeaderRow = true,
                    }
                });
            }
            else
            {
                result = excelReader.AsDataSet();
            }
            excelReader.Close();
            return result;
        }
        public static DataSet ExcelToDataSet(Stream stream, string fileExtension, bool IsFirstRowAsColumnNames = true)
        {
            IExcelDataReader excelReader;

            if (fileExtension.Equals(".xls"))
                excelReader = ExcelReaderFactory.CreateBinaryReader(stream);
            else if (fileExtension.Equals(".xlsx"))
                excelReader = ExcelReaderFactory.CreateOpenXmlReader(stream);
            else
                throw new Exception("The file to be processed is not an Excel file");

            DataSet result;

            if (IsFirstRowAsColumnNames)
            {
                result = excelReader.AsDataSet(new ExcelDataSetConfiguration()
                {
                    UseColumnDataType = true,

                    ConfigureDataTable = (tablereader) => new ExcelDataTableConfiguration()
                    {
                        UseHeaderRow = true,
                    }
                });
            }
            else
                result = excelReader.AsDataSet();

            excelReader.Close();
            return result;
        }

        public static DataSet ExcelToDataSet(Stream stream)
        {

            bool IsFirstRowAsColumnNames = true;

            // Choose one of either 1 or 2
            // 1. Reading from a binary Excel file ('97-2003 format; *.xls)
            IExcelDataReader excelReader;

            excelReader = ExcelReaderFactory.CreateOpenXmlReader(stream);

            DataSet result;

            if (IsFirstRowAsColumnNames)
            {
                result = excelReader.AsDataSet(new ExcelDataSetConfiguration()
                {
                    ConfigureDataTable = (tablereader) => new ExcelDataTableConfiguration()
                    {
                        UseHeaderRow = true,
                    }
                });
            }
            else
            {
                result = excelReader.AsDataSet();
            }
            excelReader.Close();
            return result;


        }


        private static IExcelDataReader GetExcelDataReader(string path)
        {
            using (FileStream fileStream = File.Open(path, FileMode.Open, FileAccess.Read))
            {
                IExcelDataReader dataReader;

                if (path.EndsWith(".xls"))
                {
                    dataReader = ExcelReaderFactory.CreateBinaryReader(fileStream);
                }
                else if (path.EndsWith(".xlsx"))
                {
                    dataReader = ExcelReaderFactory.CreateOpenXmlReader(fileStream);
                }
                else
                {
                    //Throw exception for things you cannot correct
                    throw new Exception("The file to be processed is not an Excel file");
                    //new FileToBeProcessedIsNotInTheCorrectFormatException("The file to be processed is not an Excel file");
                }

                //                dataReader.IsFirstRowAsColumnNames = isFirstRowAsColumnNames;

                return dataReader;
            }
        }

        public static DataSet GetExcelDataAsDataSet(string path, bool isFirstRowAsColumnNames)
        {


            if (isFirstRowAsColumnNames)
            {
                return GetExcelDataReader(path).AsDataSet(new ExcelDataSetConfiguration()
                {
                    ConfigureDataTable = (tablereader) => new ExcelDataTableConfiguration()
                    {
                        UseHeaderRow = true,
                    }
                });
            }
            else
            {
                return GetExcelDataReader(path).AsDataSet();
            }
        }

        public static DataTable GetExcelWorkSheet(string workSheetName, string path, bool isFirstRowAsColumnNames)
        {
            DataSet dataSet = GetExcelDataAsDataSet(path, isFirstRowAsColumnNames);
            DataTable workSheet = dataSet.Tables[workSheetName];

            if (workSheet == null)
            {
                throw new Exception(string.Format("The worksheet {0} does not exist, has an incorrect name, or does not have any data in the worksheet", workSheetName));
            }

            return workSheet;
        }

        public static IEnumerable<DataRow> GetData(string workSheetName, string path, bool isFirstRowAsColumnNames)
        {
            DataTable workSheet = GetExcelWorkSheet(workSheetName, path, isFirstRowAsColumnNames);

            IEnumerable<DataRow> rows = from DataRow row in workSheet.Rows
                                        select row;

            return rows;
        }
    }
}
