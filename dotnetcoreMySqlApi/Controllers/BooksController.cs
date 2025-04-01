
using dotnetcoreMySqlApi.Helpers;
using dotnetcoreMySqlApi.Entities;
using dotnetcoreMySqlApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dotnetcoreMySqlApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        public readonly BookService _bookService;

        public BooksController(BookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public ActionResult<List<Book>> Get() => _bookService.GetList();

        [HttpGet("{id:length(24)}")]
        public ActionResult<Book> Get(int id)
        {
            var findBook = _bookService.FindById(id);

            if (findBook == null)
            {
                return NotFound();
            }

            return findBook;
        }

        [HttpPost("", Name = "CreateBookAsync")]
        [Authorize]   
        public async Task<ActionResult<Book>> CreateBookAsync(Book bookIn)
        {
            var intBook = await _bookService.Create(bookIn);

            return CreatedAtRoute("CreateBookAsync", new { Controller = "Books", id = bookIn.Book_Id }, intBook) ;
        }

        [HttpPut("{id:length(24)}")]
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

        [HttpDelete("{id:length(24)}")]
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
