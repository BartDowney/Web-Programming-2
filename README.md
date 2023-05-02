# To Run the Notes App

First, using Mongo Compass or some other means, you must create a new database in MongoDB called "notes" with a collection called "notes." Then turn on your MongoDB by navigating to your Mongo folder in terminal and typing "mongod." You should see all the messages related to a successful database launch.

Next, open the Notes app in Visual Studio Code. Open a new terminal and navigate to "cd notes-frontend." Once there, you need to install all the packages that weren't pushed to Github by typing "npm install." This should install all the required packages.

Next you need to transpile all of the Typescript files into Javascript files that can be used by the node.js server. Do this by typing "ng run build." Then in the solution window, open the "dist" folder and find the "server.js" file. Open this file and find the line that imports the Note. At the end of this line, add ".js" to the end of "note.model." The final line will read:

Save this file.

Open a new terminal and navigate to "cd notes-frontend." Type "node dist/out-tsc/server.js." This is how you start the node.js server, and as long as you have MongoDB running, you should see two messages appear in your terminal:

Server open on port 3100
Connected to MongoDB

After this, open a new terminal and navigate to "cd notes-frontend." Type "ng serve --open." This will start the application and open it in your browser.

In the browser, you will see the main application page, which should just be an input field at the top and a big button at the bottom that says "Add." Click on the "Add" button and it should take you to a screen that has inputs for "title" and "body," along with "Cancel" and "Save" buttons. Clicking on "Cancel" will take you back to the main page.

Click "Add" again and enter a title and body into the inputs, and click "Save." You should be directed back to the main page, with the Note you just created displaying on the screen. Create a few more Notes, and they should all be displaying. You can then use the input at the top of the page to filter through your Notes.

To verify that your Notes have successfully been stored in the database, close the browser window and kill the terminal in Visual Studio Code where you started the app with "ng serve." IMPORTANT: Do NOT kill the terminal where you started the node.js server.

Now open a new terminal and navigate to "cd notes-frontend." Type "ng serve --open" again. The application will restart, and should now display all of the Notes you created before.

Note: If you click on any of the Notes, you will see the successful UI implementation of animation to indicate you are selecting this Note. You will also see a red X appear, and you can click on this to trigger even more animation. However, since the CRUD operations in the app are not working for "update" and "delete," nothing will happen when you click a Note or it's red X. If you open Dev Tools, you will see errors related to this.

