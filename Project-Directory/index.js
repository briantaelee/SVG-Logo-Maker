const fs = require('fs');
const { createSVGWindow } = require('svgdom');
const { Triangle, Circle, Square } = require('./shape');

const window = createSVGWindow();
const document = window.document;
const { SVG, registerWindow } = require('@svgdotjs/svg.js'); 

registerWindow(window, document);

import('inquirer')
  .then(async (inquirerModule) => {
    const inquirer = inquirerModule.default; 

    const questions = [
      {
        type: 'input',
        message: 'Enter 3 characters: ',
        name: 'textInput',
      },
      {
        type: 'input',
        message: 'Enter text Color: ',
        name: 'textColorInput',
      },
      {
        type: 'checkbox',
        message: 'Select shape: ',
        name: 'shapeInput',
        choices: ['circle', 'triangle', 'square'],
      },
      {
        type: 'input',
        message: 'Enter shape color: ',
        name: 'shapeColorInput',
      },
    ];

    async function init() {
      const answers = await inquirer.prompt(questions);

      createLogo(
        answers.textInput,
        answers.textColorInput,
        answers.shapeInput,
        answers.shapeColorInput
      );
    }

    function createLogo(text, textColor, selectedShapes, shapeColor) {
      const draw = SVG().size(300, 200).addTo(document); 

      for (const shape of selectedShapes) {
        if (shape === 'circle') {
          const circle = new Circle(text, textColor, shapeColor);
          circle.render();
          circle.addTo(draw); 

        } else if (shape === 'triangle') {
          const triangle = new Triangle(text, textColor, shapeColor);
          triangle.render();
          triangle.addTo(draw); 

        } else if (shape === 'square') {
          const square = new Square(text, textColor, shapeColor);
          square.render();
          square.addTo(draw); 

        }
      }

      fs.writeFileSync('logo.svg', draw.svg());
      console.log('Generated logo.svg');
    }

    init();
  })
  .catch((error) => {
    console.error('Error importing inquirer:', error);
  });
