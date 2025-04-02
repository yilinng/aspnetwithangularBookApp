
using dotnetcoreMySqlApi.Helpers;
using dotnetcoreMySqlApi.Entities;
using dotnetcoreMySqlApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.AspNetCore.Cors;

namespace dotnetcoreMySqlApi.Controllers
{
    [EnableCors("CorsApi")]
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        public readonly BookService _bookService;
        private readonly ILogger _logger;

        public BooksController(BookService bookService, ILogger<BooksController> logger)
        {
            _bookService = bookService;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<List<Book>> Get() => _bookService.GetList();

        [HttpGet("{id}")]
        public ActionResult<Book> Get(int id)
        {
            var findBook = _bookService.FindById(id);

            if (findBook == null)
            {
                return NotFound();
            }


            _logger.LogInformation("{Books} getById in at {Time}.",
            findBook.ToString(), DateTime.UtcNow);

            return findBook;
        }

        [HttpPost("", Name = "CreateBookAsync")]
        [Authorize]
        public async Task<ActionResult<Book>> CreateBookAsync(Book bookIn)
        {
            var intBook = await _bookService.Create(bookIn);

            return CreatedAtRoute("CreateBookAsync", new { Controller = "Books", id = bookIn.Book_Id }, intBook);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> UpdateBookAsync(int id, Book bookIn)
        {

            var book = _bookService.FindById(id);

            if (book == null)
            {
                return NotFound();
            }

            await _bookService.Update(id, bookIn);

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> RemoveBookAsync(int id)
        {

            var book = _bookService.FindById(id);

            if (book == null)
            {
                return NotFound();
            }

            await _bookService.Remove(id);

            return NoContent();


        }
    }
}
