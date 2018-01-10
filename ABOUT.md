**Programming language and integrated development environment (IDE) :

Based on my last years of experience in .Net I picked Microsoft Visual Studio 2017 with .NetFramework 4.6.1 plus KnokoutJs libraries (will be clarified) to implement the user Interface under project Name “HotelOffers.UI”, you can check below the project structure:
 
	Index.html : main search page which is written using HTML , decorated using bootstrap CSS and binded to the Java script Model using Knockout libraries.

	App/searchHotelOffers.js :JavaScript file which is considered as the model and have all observables that were connected to our Dom elements .

	Controllers /HotelOffersController: Web API 2 Controller which have the server-side code written by VB.net.

	CSS: containing our style sheets and used images.

	Scripts: containing Knouckout.js files, JQuery.js and JQuery.UI.js files .

	Models: containing our searching entities and Dto’s .


*****Some Assumptions were made:

	Assumption 1 :
Searching query parameters should be sent exactly as mentioned below in the header of the Get HttpWebRequest to your JSON API and not like they were returned in the search result since their names were different 
•	destinationName
•	lengthOfStay
•	min/maxTripStartDate
•	min/maxStarRating
•	min/maxTotalRate 
•	min/maxGuestRating

Issue noticed here : while testing I keep getting random 5 hotel offers regardless the values of the upper Searching query parameters !
I guess you meant it and there is no problem in the search request .


	Assumption 2 :
Since server-side pagination is not allowed to send it in the query parameters so I considered that the total record count is equal the length of returned list and implement the client-side pagination.
there are no issues if I can get the total hotels offers which are matching the searching criteria.
***************************************************************************************************************
**UI Implemented using: Knockout

Knockout  is a standalone JavaScript implementation of the MVVM (a modern variant of MVC) pattern with templates. The underlying principles are therefore:
•	a clear separation between domain data, view components and data to be displayed
•	the presence of a clearly defined layer of specialized code to manage the relationships between the view components
It uses observable to make your UI automatically stay in sync with an underlying data model, along with a powerful and extensible set of declarative bindings to enable productive development.

**Getting started

Totally new to Knockout? The most fun place to start is the online interactive tutorials.
For more details, see
•	Documentation on the project's website
•	Online examples at http://knockoutjs.com/examples/ 
Downloading Knockout
You can download released versions of Knockout from the project's website.

**Why Knockout?

•	Free, open source
•	Pure JavaScript — works with any web framework.
•	Small & lightweight — 59kb minified
•	No dependencies
•	Supports all mainstream browsers, even ancient ones
IE 6+, Firefox 3.5+, Chrome, Opera, Safari (desktop/mobile)

**License

MIT license - http://www.opensource.org/licenses/mit-license.php

**References

https://en.wikipedia.org/wiki/Knockout_(web_framework) 
