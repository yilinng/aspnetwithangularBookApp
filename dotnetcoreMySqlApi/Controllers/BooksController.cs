
using dotnetcoreMySqlApi.Entities;
using dotnetcoreMySqlApi.Services;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("{id}")]
        public ActionResult<Book> Get(int id)
        {
            var findBook = _bookService.FindById(id);

            if (findBook == null)
            {
                return NotFound();
            }

            return findBook;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Book>> CreateBookAsync(Book bookIn)
        {
            var intBook = await _bookService.Create(bookIn);

            return intBook;
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<Book>> UpdateBookAsync(int id, Book bookIn)
        {

            if (id != bookIn.Book_Id)
            {
                return BadRequest();
            }

            var findBook = await _bookService.Update(id, bookIn);

            if (findBook == null)
            {
                return NotFound();
            }

            return findBook;
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult RemoveBookAsync(int id)
        {

            var book = _bookService.FindById(id);

            if (book == null)
            {
                return NotFound();
            }

            _bookService.Remove(id);

            return NoContent();


        }
    }
}
