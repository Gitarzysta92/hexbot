![Hexbot](https://user-images.githubusercontent.com/212941/59163439-23c05900-8ab6-11e9-8764-977334c7bba8.png)

# Floating gradients

Create floating gradients as background.
To get new set of colors just click the button :)

## Installing 

Just clone the repo, install dependencies and start using 'npm run app'. Enjoy!


## Options

If you only want, you can tweak few parameters for different output.

Time between each canvas redraw in ms.
```
{
  redrawInterval: 100
}
```

The amount in px by which the coordinates of shapes are changed
```
{
	animationOptions: {
		strategyStep: 10
	}
}
```

The interval in ms between setting random new, coordinates change strategy
```
{
	animationOptions: {
		strategyInterval: 2000
	}
}
```
