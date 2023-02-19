<!DOCTYPE html>
<header>
<h1>Discord Roblox Bot Tutorial</h1>
<h2>How to Host your bot?</h2>
</header>
<body>
<p>
  <ul>
    <li>Download Bitvise SSH Client by clicking <a href="https://www.bitvise.com/download-area" target="_blank">here</a> and click <strong>Download Bitvise SSH Client</strong></li>
    <li>Go to Digital Ocean by clicking this <a href="https://cloud.digitalocean.com/login?redirect_url=https%3A%2F%2Fcloud.digitalocean.com%2Fnetworking%2Fdomains%3Fi%3D0aae23" target="_blank">link</a> and Sign in or create an account.</li>
    <li>When you are Logged into Digital Ocean Click New Project.</li>
    <li>Enter a Name, Description, and Choose Web Application for your Project.</li>
    <li>Click <strong>Create Project</strong></li>
    <li>Now you will see something that asks you to Move Resources.</li>
    <li>Click <strong>Skip for now</strong></li>
    <li>Click the Green <strong>Create</strong> button at the Top and Choose <strong>Droplets</strong></li>
    <li>Choose your Region and Datacenter. I normally do <strong>New York</strong> and <strong>New York * Data Center 1 * NYC1</strong></li>
    <li>Scroll down and make sure it is on the OS Tab and Click <strong>Ubuntu</strong> and select the Latest version.</li>
    <li>For Droplet type choose <strong>Basic</strong> and pick the Best pricing option that works best for you.</li>
    <li>Select Password for Authenication Method and Create a unique password. (You will need to remember this to login to the terminal.)</li>
    <li>Give your Droplet a Hostname and click <strong>Create Droplet</strong></li>
    <li>Congrats Your Droplet is Created!</li>
  </ul>
</p>
<h2>Create a Domain to send HTTP requests to Roblox for in-game ranking commands.</h2>
<p>
  <ul>
    <li>Go to Namecheap by clicking this <a href="https://www.namecheap.com/domains/" target="_blank">link</a> and search for a Domain and it can be as low as $2.00 or less.</li>
    <li>After you purchased your Domain go back to <strong>Digital Ocean</strong></li>
    <li>When you are on Digital Ocean Click <strong>Manage</strong> and click <strong>Networking</strong></li>
    <li>Click the Domains Tab and Enter your domain and select your Project.</li>
    <li>Click <strong>Add Domain</strong></li>
    <li>Click on your domain when you added it and add an A record and 2 CNAME records.</li>
    <li>Your A record should be <strong>domainname.TopLevelDomain</strong> pointed to your Project's IP address.</li>
    <li>One of your CNAMES should be <strong>www.domainname.TopLevelDomain</strong> pointed to <strong>domainname.TopLevelDomain</strong></li>
    <li>Your other CNAME should be <strong>www.domainname.TopLevelDomain.domainname.TopLevelDomain</strong> pointed to <strong>domainname.TopLevelDomain</strong></li>
  </ul>
</p>
<h2>Setting up Terminal for hosting</h2>
<p>
  <ul>
    <li>Open <strong>Bitvise SSH Client</strong> and enter your Digital Ocean's Droplet IP address into the Host.</li>
    <li>Enter <strong>22</strong> for the Port and type <strong>root</strong> for the Username.</li>
    <li>Make sure Password is selected for Initial Method in the Authentication section and Create a Password.</li>
    <li>Make sure both of the Checkboxes are Checked!</li>
    <li>Click Login and Click save if it pops up asking you to save the login info to your profile.</li>
    <li>Now Open the Terminal</li>
    <li>Enter the Following Commands into the Terminal: <strong>sudo apt-get update</strong> and press Enter. Now, enter <strong>sudo apt-get upgrade</strong> type y and press enter. If a purple box pops up asking to restart press enter!</li>
    <li>Enter <strong>sudo apt-get install nodejs</strong> this will install node for you to run your bot.</li>
    <li>Type <strong>node -v</strong> and <strong>npm -v</strong> and if you get an error for npm use this command: <strong>sudo apt-get install npm</strong> and run the <strong>npm -v</strong> again.</li>
    <li>Now make a folder for your Bot by using this command: <strong>mkdir (name of folder).</strong></li>
    <li>When you are done with that go back to the Bitvise SSH Client and open the SFTP Window and make sure you are inside the Bot folder that you just made in the Remote Files.</li>
    <li>Come to this Github page and Download the Bot files and upload them to your <strong>Remote Files</strong> in the Bitvise SSH Client.</li>
  </ul>
</p>
<h2>Downloading the Dependencies</h2>
<p>
  <ul>
    <li>Open your Terminal in Bitvise SSH Client and type <strong> sudo apt-get install ffmpeg</strong></li>
    <li>Now type <strong>sudo apt-get install nginx</strong></li>
  </ul>
</p>
<h2>Setting Up Nginx for HTTP Requests to Roblox</h2>
<p>
<ul>
  <li>Now that you should have Nginx installed run <strong>sudo systemctl status nginx</strong> to see if Nginx is working properly.</li>
  <li>Do <strong>curl localhost</strong> in the terminal to see what the Nginx Webpage looks like.</li>
  <li>Type <strong>cd /etc/nginx/</strong> to enter the Nginx Directory in the terminal.</li>
  <li>Type <strong>cat nginx.conf</strong> to the the nginx configurations.</li>
  <li>Now type <strong>cd sites-enabled</strong> to go to the nginx sites directory.</li>
  <li>Type <strong>unlink default</strong> to disconnect the default site from nginx.</li>
  <li>Now type in <strong>cd conf.d/</strong> to go to the conf.d directory and type <strong>nano domainname.local.conf</strong> to create a webserver.</li>
  <li>Now Type in <strong>server { listen portnumber default_server; index index.html index.htm index.php; server_name domainname.local; root /var/www/domainname.local; }</strong> into your file and press CTRL+O on your keyboard to save and press CTRL+X to exit.</li>
</ul>
</p>
<h2>Running your Bot</h2>
<p>
  <ul>
    <li>To bring your bot online type <strong>cd botfoldername</strong> and type <strong>screen</strong> when you type this it will allow you to detach keeping the bot online 24/7. Now type <strong>node index.js</strong> and press CTRL+A+D at the same time on your keyboard to detach.</li>
    <li>Now you can close all windows and your Bot will run in the Background 24/7 even if you close your PC.</li>
    <h3>Note: Your Bot will only go Offline if your code has an error or it sent too many requests and is getting rate limited. Rate limits shouldn't be a problem though.</h3>
  </ul>
</p>
<h2>Don't forget to Download Visual Studio Code if you don't have it already!</h2>
<p>
<ul>
<li>Go to this <a href="https://code.visualstudio.com/Download">link</a> and select the one for your system.</li>
</ul>
</p>
</body>
<footer>
  <p><i>Created By:</i> AEW745  <i>&copy2023 All Rights Reserved.</p>
</html>
