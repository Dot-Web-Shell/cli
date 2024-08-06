using NativeShell.Pages;

namespace DotWebApp;

public partial class App : Application
{
	public App()
	{
		InitializeComponent();

		MainPage = new NativeShellMainPage() {
			Url = "$$config.url$$"
		};
	}
}
