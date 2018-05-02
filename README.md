# Cache-Busting-Sample
A sample that use file hashes to implement front end cache busting.

## To Run This Sample
1. Clone this repository and open in Visual Studio
2. Restore Nuget Packages
3. In a command prompt / terminal, open the folder that contains the *.csproj* file.
4. Insall packages from npm, run `npm install`
5. Run the gulp task with the command `gulp run`
6. Done! You can run the solution now. Press F5 and start debugging. Within the network tab of your browser you would see your JS files being served with the format `<filename>-<file-hash>.js`
