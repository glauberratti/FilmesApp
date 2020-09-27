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
                .Must((x) => {
                    if (string.IsNullOrEmpty(x)) return true;
                    return int.TryParse(x, out var i);
                }).WithMessage("'Year' deve ser numérico")
                .Length(4).When(x => !string.IsNullOrEmpty(x.Year));
        }
    }
}
