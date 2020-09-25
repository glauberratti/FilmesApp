using AutoMapper;
using FilmesApp.API.DTOs;
using FilmesApp.Core.Entities;
using FilmesApp.Core.Interfaces.Services;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FilmesApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private IMovieService _movieService;
        private IMapper _mapper;
        private IValidator<SaveMovieDTO> _validator;

        public MoviesController(IMovieService movieService, IMapper mapper, IValidator<SaveMovieDTO> validator)
        {
            _movieService = movieService;
            _mapper = mapper;
            _validator = validator;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> GetById(int id)
        {
            try
            {
                var movie = await _movieService.GetById(id);

                if (movie == null)
                    return NotFound();

                var movieDTO = _mapper.Map<Movie, MovieDTO>(movie);
                return Ok(movieDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var movies = await _movieService.GetAll();

                var moviesDTO = _mapper.Map<IEnumerable<Movie>, IEnumerable<MovieDTO>>(movies);

                return Ok(moviesDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Add([FromBody] SaveMovieDTO saveMovie)
        {
            try
            {
                var validatorResult = await _validator.ValidateAsync(saveMovie);

                if (!validatorResult.IsValid)
                    return BadRequest(validatorResult.Errors);

                var movie = _mapper.Map<SaveMovieDTO, Movie>(saveMovie);
                await _movieService.Save(movie);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var movie = await _movieService.GetById(id);

                if (movie == null)
                    return NotFound();

                await _movieService.Delete(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
