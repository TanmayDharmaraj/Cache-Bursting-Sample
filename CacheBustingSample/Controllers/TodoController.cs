using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CacheBustingSample.Models;

namespace CacheBustingSample.Controllers
{
    [RoutePrefix("api/todo")]
    public class TodoController : ApiController
    {
        // GET api/todos
        public IEnumerable<TodoModel> Get()
        {
            List<TodoModel> model = new List<TodoModel>();
            model.Add(new TodoModel()
            {
                done = false,
                todoText = "First Value"
            });
            return model;
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
