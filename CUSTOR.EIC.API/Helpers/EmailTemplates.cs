using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

//using AutoMapper.Configuration;

namespace EICOnline.Helpers
{
    public static class EmailTemplates
    {
        private static IHostingEnvironment _hostingEnvironment;
        private static string confirmEmailTemplate;
        private static string confirmMessageTemplate;
        private static string testEmailTemplate;
        private static string plainTextTestEmailTemplate;
        private static IConfiguration _config;

        public static void Initialize(IHostingEnvironment hostingEnvironment, IConfiguration config)
        {
            _hostingEnvironment = hostingEnvironment;
            _config = config;
        }

        public static string GetConfirmationEmail(string recepientName, string confirmUrl)
        {
            var orgName = _config["OrganizationName"];
            if (confirmEmailTemplate == null)
                confirmEmailTemplate = ReadPhysicalFile("Helpers/Templates/ConfirmEmail.template");

            var emailMessage = confirmEmailTemplate
                .Replace("{user}", recepientName)
                .Replace("{confirmLink}", confirmUrl)
                .Replace("{orgName}", orgName);

            return emailMessage;
        }

        public static string GetConfirmationEmailAdmin(string recepientName, string confirmUrl, string tempPassword)
        {
            var orgName = _config["OrganizationName"];
            if (confirmEmailTemplate == null)
                confirmEmailTemplate = ReadPhysicalFile("Helpers/Templates/ConfirmEmailAdmin.template");

            var emailMessage = confirmEmailTemplate
                .Replace("{user}", recepientName)
                .Replace("{confirmLink}", confirmUrl)
                .Replace("{userPassword}", tempPassword)
                .Replace("{orgName}", orgName);

            return emailMessage;
        }

        public static string GetResetConfirmationEmail(string recepientName, string confirmUrl)
        {
            var orgName = _config["OrganizationName"];
            if (confirmEmailTemplate == null)
                confirmEmailTemplate = ReadPhysicalFile("Helpers/Templates/ConfirmReset.template");

            var emailMessage = confirmEmailTemplate
                .Replace("{user}", recepientName)
                .Replace("{confirmLink}", confirmUrl)
                .Replace("{orgName}", orgName);

            return emailMessage;
        }

        public static string GetConfirmationMessage(string returnLink)
        {
            if (confirmMessageTemplate == null)
                confirmMessageTemplate = ReadPhysicalFile("Helpers/Templates/ConfirmMessage.template");
            var orgName = _config["OrganizationName"];
            var confirmationMessage = confirmMessageTemplate
                .Replace("{returnLink}", returnLink)
                .Replace("{orgName}", orgName);
            return confirmationMessage;
        }

        public static string GetResetConfirmationMessage(string returnLink)
        {
            if (confirmMessageTemplate == null)
                confirmMessageTemplate = ReadPhysicalFile("Helpers/Templates/ResetMessage.template");
            var orgName = _config["OrganizationName"];
            var confirmationMessage = confirmMessageTemplate
                .Replace("{returnLink}", returnLink)
                .Replace("{orgName}", orgName);
            return confirmationMessage;
        }

        public static string GetTestEmail(string recepientName, DateTime testDate)
        {
            if (testEmailTemplate == null)
                testEmailTemplate = ReadPhysicalFile("Helpers/Templates/TestEmail.template");

            var emailMessage = testEmailTemplate
                .Replace("{user}", recepientName)
                .Replace("{testDate}", testDate.ToString());

            return emailMessage;
        }

        public static string GetPlainTextTestEmail(DateTime date)
        {
            if (plainTextTestEmailTemplate == null)
                plainTextTestEmailTemplate = ReadPhysicalFile("Helpers/Templates/PlainTextTestEmail.template");

            var emailMessage = plainTextTestEmailTemplate
                .Replace("{date}", date.ToString());

            return emailMessage;
        }

        private static string ReadPhysicalFile(string path)
        {
            if (_hostingEnvironment == null)
                throw new InvalidOperationException($"{nameof(EmailTemplates)} is not initialized");

            var fileInfo = _hostingEnvironment.ContentRootFileProvider.GetFileInfo(path);

            if (!fileInfo.Exists)
                throw new FileNotFoundException($"Template file located at \"{path}\" was not found");

            using (var fs = fileInfo.CreateReadStream())
            {
                using (var sr = new StreamReader(fs))
                {
                    return sr.ReadToEnd();
                }
            }
        }
    }
}