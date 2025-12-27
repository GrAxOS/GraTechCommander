using System.Windows;
using System.Windows.Input;

namespace GraTechCommander;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    private void Window_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
    {
        if (e.LeftButton == MouseButtonState.Pressed)
            DragMove();
    }

    private void Minimize_Click(object sender, RoutedEventArgs e)
    {
        WindowState = WindowState.Minimized;
    }

    private void Maximize_Click(object sender, RoutedEventArgs e)
    {
        WindowState = WindowState == WindowState.Maximized 
            ? WindowState.Normal 
            : WindowState.Maximized;
    }

    private void Close_Click(object sender, RoutedEventArgs e)
    {
        Close();
    }

    private void Conversation_Click(object sender, MouseButtonEventArgs e)
    {
        // Handle conversation selection through binding
        if (sender is FrameworkElement element && element.DataContext is Models.Conversation conv)
        {
            if (DataContext is ViewModels.MainViewModel vm)
            {
                vm.SelectConversationCommand.Execute(conv);
            }
        }
    }
}