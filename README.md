#Cube Captcha
Limit signups to cubers, make people learn notation, or just prevent people from signing up at all. Choose the solution from radio buttons. The value of the buttons is checked on a cube model so a text field input could (and should) be implemented.

##Requirements
- JQuery
- VisualCube.php setup somewhere.

##Security
It could be bypassed easily since all the JS is on the frontend. Switching from radio buttons to a text field will drastically improve it. Moving the model and solve checks to some the backend would improve it the most.
