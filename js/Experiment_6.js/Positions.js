class Positions {

  // Returns a grid of zeros with 360 columns and nLayers rows
  blank(nLayers) {
    var grid = new Array(360).fill(0)
    for(i=1; i<n; i++ {
        grid.push(new Array(360).fill(0))
    }
    return blank
  }

  // Returs a row with n equally spaced dots (dot is represented by value 1)
  equallySpaced(n) {
    var grid = new Array(360).fill(0)
    const step = 360/n

    // Creates an array with exact float positions of the dots
    var arrayOfPrecisePositions = [0, step]
    for(k=2; k<n; k++) {
      arrayOfPrecisePositions.push(step*k)
    }

    // Positions get rounded to the nearest degree of the circumference
    for preciseDot of arrayOfPrecisePositions {
      grid[Math.round(preciseDot)] = 1
    }

    return grid
  }

  addBlankLayer(grid) {
    grid.push(new Array(360).fill(0))
    return grid
  }

  popLayer(grid) {
    grid.pop()
    return grid
  }

  addLayerOfEquallySpaced(grid, n) {

  }



}
