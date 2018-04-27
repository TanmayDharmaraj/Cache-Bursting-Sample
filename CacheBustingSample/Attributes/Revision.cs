using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using Newtonsoft.Json;

namespace CacheBustingSample.Attributes
{
    public static class Revision
    {
        public static string Version(string path)
        {
            if (HttpRuntime.Cache[path] == null)
            {
                using (StreamReader sr = new StreamReader(HostingEnvironment.MapPath("~/Scripts/rev-manifest.json")))
                {
                    Dictionary<string, string> rev = JsonConvert.DeserializeObject<Dictionary<string, string>>(sr.ReadToEnd());
                    string revedFile = rev.Where(s => path.Contains(s.Key)).Select(g => g.Value).FirstOrDefault();
                    string actualPath = "/Scripts/dist/" + revedFile;
                    HttpRuntime.Cache.Insert(path, actualPath);
                }
            }
            return HttpRuntime.Cache[path] as string;
        }
    }
}
