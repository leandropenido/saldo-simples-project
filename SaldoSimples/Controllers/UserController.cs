using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaldoSimples.Interfaces;
using SaldoSimples.Models;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;


namespace SaldoSimples.Controllers
{

	public enum UserErrorCode
	{
		UserRegisterInvalid,
		CouldNotLogIn,
		UserIdInUse,
		RecordNotFound,
		CouldNotCreateUser,
		CouldNotUpdateUser,
		CouldNotDeleteUser
	}


	[ApiController]
	[Route("api/[controller]")]
	public class UsersController : ControllerBase
	{
		private readonly IUserRepository _userRepository;

		private readonly IConfiguration _config;

		private readonly IWebHostEnvironment _env;
		public UsersController(IUserRepository userRepository, IConfiguration config, IWebHostEnvironment env)
		{
			_userRepository = userRepository;
			_config = config;
			_env = env;
		}

		[Authorize]
		[HttpGet]
		public async Task<IActionResult> List()
		{
			return Ok(await _userRepository.All());
		}

		[AllowAnonymous]
		[HttpPost]
		public async Task<IActionResult> Create([FromBody] User user)
		{
			try
			{
				if (user == null || !ModelState.IsValid)
				{
					return BadRequest(UserErrorCode.UserRegisterInvalid.ToString());
				}
				bool itemExists = await _userRepository.DoesItemExist(user.Id);
				if (itemExists)
				{
					return StatusCode(StatusCodes.Status409Conflict, UserErrorCode.UserIdInUse.ToString());
				}

				if (!string.IsNullOrEmpty(user.SenhaString))
				{
					user.Senha = Encoding.UTF8.GetBytes(user.SenhaString);
				}


				await _userRepository.Insert(user);
			}
			catch (Exception)
			{
				return BadRequest(UserErrorCode.CouldNotCreateUser.ToString());
			}
			return Ok(user);
		}

		[AllowAnonymous]
		[HttpPost("login")]
		public async Task<IActionResult> Login([FromBody] LoginDTO loginRequest)
		{
			try
			{
				if (loginRequest == null || !ModelState.IsValid)
				{
					return BadRequest(UserErrorCode.RecordNotFound.ToString());
				}
				var usr = await _userRepository.FindByEmail(loginRequest.Email);
				if (usr == null)
				{
					return BadRequest(UserErrorCode.RecordNotFound.ToString());
				}


				bool validPassword = Encoding.UTF8.GetString(usr.Senha) == loginRequest.Password;

				if (!validPassword)
				{
					return BadRequest(UserErrorCode.CouldNotLogIn.ToString());
				}


				var photoPath = "/img/users/default.png";
				if (string.IsNullOrEmpty(usr.Foto))
				{
					usr.Foto = photoPath;
					await _userRepository.Update(usr);
				}
				var claims = new List<Claim>
				{
					new Claim(ClaimTypes.Name, usr.UserName),
					new Claim(ClaimTypes.NameIdentifier, usr.Id.ToString()),
					new Claim("photoPath", usr.Foto),
					new Claim("Cpf", usr.CPF)
				};

				var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);
				var securityKey = new SymmetricSecurityKey(key);
				var credential = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

				var token = new JwtSecurityToken(
					claims: claims,
					expires: DateTime.Now.AddDays(7),
					signingCredentials: credential
				);

				return Ok(new
				{
					Message = "Login successful",
					Token = new JwtSecurityTokenHandler().WriteToken(token),
					User = new
					{
						usr.Id,
						usr.UserName,
						usr.Email,
						usr.Foto,
						usr.CPF,
					}
				});
			}
			catch (Exception)

			{
				return BadRequest(UserErrorCode.CouldNotLogIn.ToString());
			}

		}

		[Authorize]
		[HttpPut]
		public async Task<IActionResult> Edit([FromBody] User user)
		{
			try
			{
				
				if (user == null || !ModelState.IsValid)
				{
					return BadRequest(UserErrorCode.UserRegisterInvalid.ToString());
				}
				var existingUser = await _userRepository.Find(user.Id);
				if (existingUser == null)
				{
					return NotFound(UserErrorCode.RecordNotFound.ToString());
				}
				var fotoDir = Path.Combine(_env.WebRootPath, "img", "users");
				var extension = Path.GetExtension(user.UploadedFoto.FileName);
				var fileName = $"{Guid.NewGuid()}{extension}";
				var filePath = Path.Combine(fotoDir, fileName);

				using (var stream = new FileStream(filePath, FileMode.Create))
				{
					await user.UploadedFoto.CopyToAsync(stream);
				}

				existingUser.Foto = $"/img/users/{fileName}";

				await _userRepository.Update(existingUser);
			}
			catch (Exception)
			{
				return BadRequest(UserErrorCode.CouldNotUpdateUser.ToString());
			}
			return NoContent();
		}

		[Authorize]
		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			try
			{
				var user = await _userRepository.Find(id);
				if (user == null)
				{
					return NotFound(UserErrorCode.RecordNotFound.ToString());
				}
				await _userRepository.Delete(id);
			}
			catch (Exception)
			{
				return BadRequest(UserErrorCode.CouldNotDeleteUser.ToString());
			}
			return NoContent();
		}
	}
}