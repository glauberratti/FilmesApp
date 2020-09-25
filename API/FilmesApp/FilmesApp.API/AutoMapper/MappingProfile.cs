using AutoMapper;
using FilmesApp.API.DTOs;
using FilmesApp.Core.Entities;

namespace FilmesApp.API.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<MovieDTO, Movie>().ReverseMap();
            CreateMap<SaveMovieDTO, Movie>().ReverseMap();
        }
    }
}
