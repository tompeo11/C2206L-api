using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace api.Data
{
    public class IdentityInitializer
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager){
            if(!userManager.Users.Any()){
                var user = new AppUser{
                    DisplayName = "Tom",
                    Email = "dattran932017@gmail.com",
                    UserName = "dattran932017@gmail.com",
                    Address = new Address{
                        FirstName = "Tran",
                        LastName = "Dat",
                        Street = "204/39 QL13 - P.26 - Q.BT",
                        City = "HCM",
                        State = "VN",
                        ZipCode = "70000"
                    }
                };
                await userManager.CreateAsync(user, "password");
            }
        }
    }
}