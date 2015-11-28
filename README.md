# TheTimesValidation V1.2
Instructions: Run **npm install** and **bower install** from directory and place on server. 

Demo: [http://breadcrumbs.com.mt/portfolio/tests/times/index.html]

####V1.2
Changlog
* Dynamically adds accept-charset="xxx" acording to Maltese / English in form element.
* Dynamically adds lang attribute on html element acording to langauge chosen. 
* Changed the validation object to a modular structure. 


####V1.1
Changlog
* Username availablity is now handled from backend.
* Added accept-charset="character_set" attribute to form element.
* Increased user max charachter length to 25.
* Fixed error message when entering less than 7 characters.  

######Upcoming Changes:  
* Form Testing
* Accessability Testing
* JS structure change to follow more of a modular pattern. 
* Prevent a username with the same name but different Upper/Lower cases from being created

######Known Issues:
* ~~Recaptcha is not verifying on live server.~~  (Fixed)



####V1.0
######Upcoming Changes:  
* Form Testing
* Accessibility testing
* Change 'username availability' to backend (This will save downloading the whole user.json file)

######Known Issues:
* When typing less than 7 characters in password field, form validation fails although error message is not displayed.


