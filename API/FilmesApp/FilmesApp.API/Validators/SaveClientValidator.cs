using FilmesApp.API.DTOs;
using FluentValidation;

namespace FilmesApp.API.Validators
{
    public class SaveMovieValidator : AbstractValidator<SaveMovieDTO>
    {
        public SaveMovieValidator()
        {
            RuleFor(c => c.Title)
                .NotEmpty()
                .NotNull()
                .MaximumLength(100);

            RuleFor(c => c.Director)
                .NotEmpty()
                .NotNull()
                .MaximumLength(100);

            RuleFor(c => c.Genre)
                .NotEmpty()
                .NotNull()
                .MaximumLength(50);

            RuleFor(c => c.Synopsis)
                .MaximumLength(500);

            RuleFor(c => c.Year)
                .Length(4)
                .Must((x) => {
                    return int.TryParse(x, out var i);
                }).WithMessage("'Year' deve ser numérico");
        }
    }
}
