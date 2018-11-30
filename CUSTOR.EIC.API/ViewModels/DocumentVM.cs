using Microsoft.AspNetCore.Http;

namespace EIC.Investment.API.ViewModels
{
    public class DocumentVM
    {
        public string Name { get; set; }
        public int ServicePrerequisiteId { get; set; }
        public int ServiceApplicationId { get; set; }
        public IFormFile KeyWords { get; set; }
        public int? WorkFlowId { get; set; }
        public int ProjectId { get; set; }
        public int IncentiveCategoryId { get; set; }
    }
}