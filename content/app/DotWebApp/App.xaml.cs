using NativeShell.Pages;
using Microsoft.Extensions.Configuration;

namespace DotWebApp;

class AppInfo {
	public string Url { get;set; }
}

public partial class App : Application
{
	public App(IConfiguration config)
	{
		InitializeComponent();

		var url = config.Get<AppInfo>()?.Url;

		MainPage = new NativeShellMainPage() {
			Url = url
		};
	}
}
