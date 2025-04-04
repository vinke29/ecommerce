# BicycleHub - Enhanced Shopping Experience

This project demonstrates an enhanced shopping experience for bicycles, improving upon typical search result displays with an interactive carousel, detailed product information, and a more visual approach.

## Features

- **Interactive Bicycle Carousel**: Large scrollable images with horizontal navigation
- **Review Snippets**: Quick insights from reviews directly on product cards
- **Filtering Pills**: Easily filter by bike type or price range
- **Detailed Product View**: Comprehensive information about each bicycle
- **Related Products**: Suggestions based on current viewing
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
bicycle-ecommerce/
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   └── main.js
├── images/
├── index.html
└── README.md
```

## How to Run

1. Clone the repository:
   ```
   git clone https://github.com/vinke29/ecommerce.git
   ```

2. Navigate to the project folder:
   ```
   cd ecommerce
   ```

3. Open the index.html file in your browser:
   - Double-click the file or
   - Use a local server for better experience:
     ```
     # Using Python
     python -m http.server
     
     # Or using Node.js with http-server
     npx http-server
     ```

## Implementation Details

- **Frontend Only**: This is a frontend-only implementation using HTML, CSS, and JavaScript
- **No Backend**: Product data is stored in a JavaScript file (`data.js`)
- **No External Libraries**: Built with vanilla JavaScript for simplicity

## Key Improvements Over Traditional Shopping Interfaces

1. **Large Visual Focus**: Prominent images make it easier to evaluate products
2. **Carousel Navigation**: Intuitive scrolling through options with maintained context
3. **Immediate Access to Reviews**: Review snippets directly visible on product cards
4. **Streamlined Filtering**: Quick filtering options via pills at the top
5. **Contextual Related Products**: Recommendations based on current selection

## Future Enhancements

- Integration with a backend database for dynamic product data
- User accounts and saved favorites
- Product comparison functionality
- More advanced filtering and sorting options
- Integration with reviews API for real user feedback

## License

MIT License 