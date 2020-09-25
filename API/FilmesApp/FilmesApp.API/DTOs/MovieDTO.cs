using System.ComponentModel.DataAnnotations;

namespace FilmesApp.API.DTOs
{
    public class MovieDTO
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Director { get; set; }
        [Required]
        public string Genre { get; set; }
        public string Synopsis { get; set; }
        public string Year { get; set; }
    }
}
