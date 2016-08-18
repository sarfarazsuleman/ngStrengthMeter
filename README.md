# ngStrengthMeter
Nifty password strength meter directive

## Installation

### Using Bower
You can use the `bower` package manager to install. Run:
```
  bower install ng-strength-meter
```

## Usage

### Step 1: Include the Styling in the header
```
<link href="path/to/bower_components/ng-strength-meter/dist/app.css" media="all" rel="stylesheet" type="text/css" />
```

### Step 2: Include the JS in the footer
```
<script src="path/to/bower_components/ng-strength-meter/dist/app.js" type="text/javascript"></script>
```

### Step 3: Add module to your app dependency
```
Angular.module('myApp',['ngStrengthMeter']);
```

### Step 4: Start Using the strength meter
```
<strength-meter password="{{vm.password}}"></strength-meter>
```
