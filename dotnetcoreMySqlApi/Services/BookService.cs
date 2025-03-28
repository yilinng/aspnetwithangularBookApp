using dotnetcoreMySqlApi.Data;
using dotnetcoreMySqlApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

//https://learn.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/page?view=aspnetcore-3.1&tabs=visual-studio
//https://www.csharp.com/article/asp-net-core-web-api-for-crud-operations-with-mysql/
//https://github.com/mahedee/articles/blob/master/dot-net-core/HowToCreateWebAPIinASP.NETCOrewitMySQL.md
namespace dotnetcoreMySqlApi.Services
{
    public class BookService
    {
        private readonly BookContext _context;

        private readonly List<Book> _books;

     
        public BookService(BookContext context)
        {
            _context = context;
            _books = _context.Book.ToList();
        }
  
        public List<Book> GetList() => _books.ToList();


        public async Task<ActionResult<Book>> Create(Book book)
        {
            _context.Book.Add(book);
            await _context.SaveChangesAsync();

            return book;
        }

       
        public async Task<ActionResult<Book>> Update(int id, Book bookIn)
        {
           var findBook = FindById(id);

            _context.Entry(bookIn).State = EntityState.Modified;
            //   findBook.ReplaceOne(book => book.Id == id, bookIn);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (findBook == null)
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            return bookIn;
        }
           
       

        public async void Remove(int id)
        {
            var findBook = FindById(id);

            if(findBook != null)
            {
                _context.Book.Remove(findBook);
                await _context.SaveChangesAsync();
            }
            //_books.Find(book => book.Id.Equals(id))//.DeleteOne(book => book.Id == id);

        }



        public Book FindById(int id)
        {
            Book findBook = _books.Find(book => book.Book_Id == id);

            if (findBook != null) {
                return findBook;
            }

            return null;
        }
    }
}
