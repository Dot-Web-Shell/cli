using NativeShell.Pages;
using Microsoft.Extensions.Configuration;

namespace DotWebApp;

public partial class App : Application
{
	public App(IConfiguration config)
	{
		InitializeComponent();

		var url = config.GetSection("App")?.GetValue<string>("Url");

		MainPage = new NativeShellMainPage() {
			Url = url
		};
	}
}
