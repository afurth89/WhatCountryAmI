# What Country Am I?

##Introduction

"What Country Am I?" is a web application designed to assess and grow the user's knowledge of world geography by testing how many countries they can correctly identify in 60 seconds.

I built this project in four days after only dabbling in Web Development for a few weeks. My previous background was as a middle school Social Studies teacher and it always shocked me how much difficulty students had identifying countries in our world, so we often started the day by labeling maps to build practice, and would have weekly quizzes to test knowledge.

This app was designed to make the process much easier (and more fun!).

##Technologies Used
- HTML5
- CSS3/Bootstrap
- Javascript
- jQuery
- The Lodash library
- Google's GeoCharts API

##How It Works
The app works as such:

1. Within the app, there is an object which sorts every nation in the world to a difficulty level (1-4, based on my judgement).
2. On load, the user is presented with four difficulty levels (as well as a fantastic [John Oliver clip](https://www.youtube.com/embed/Pu1PRyGKggI?rel=0) that outlines how little we truly know about where countries are). 
3. The user chooses a difficulty lelve. The pool of potential countries the user will be shown is determined by the difficulty level they choose. 
	+ For instance, if they choose 'easy', they only get the level '1' countries.
	+ If they choose 'hard', they get the level '1' and '2' countries.
4. Available countries are pushed into an array using Lodash's `transform` method, and their order is randomized using the `shuffle` method.
5. The method of for loading a new image is triggered
	+ The country code is sent via AJAX request to retrieve the country's name (which otherwise would have had to have been stored manually)
	+ The country code (and a region code, to ensure proper map sizing) are sent through Google's Chart Visualizer to produce a map of the highlighted country for the user
6. The user enters a guess, which is checked against the country name. Both the country name and user's guess are put through a RegEx to remove space, lowercase all letters, and include irregular spellings (for some reason the API returns 'Vietnam' as 'Viet Nam')
7. A simple timer, created using Javascript's `Set Timeout` function, controls whether the user can continue guessing. In the current iteration, they have one minute.

 

##Desired Improvements
As I mentioned earlier, this game was built over only four days and certainly has room for improvements. Here are a number of things I'd like to improve on. This list is largely to keep track of my own thoughts, but if you have suggestions please let me know: [andrew.furth@gmail.com](mailto:andrew.furth@gmail.com)

- Hooking up at a database to store high scores
- Allowing the user to choose variable lengths of time
- Allowing the user to choose a specific continent
- Continuing to refine the RegEx to accept more common variations of certain name (For instance "USA" doesn't count as correct at the moment)
- Generally refactoring the code to make it more DRY
 