# SwiftCart Store

SwiftCart is a modern e-commerce application built with Vue for the frontend and designed to provide users with a seamless shopping experience. This project allows users to browse products, filter them by categories, search for specific items, sort by price, and view detailed information about each product.

## Technologies Used

- **Vue.js 3**: A progressive JavaScript framework used for building the user interface.
- **Vue Router**: Provides routing capabilities for navigating between different views in the application.
- **Tailwind CSS**: A utility-first CSS framework used for styling the application.
- **API**: Fake Store API (`https://fakestoreapi.com`) for fetching product and category data.

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**
- **npm** 

### Clone the Repository

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/swiftcart.git
   ```

2. Navigate to the project directory:

   ```bash
   cd swiftcart
   ```

### Install Dependencies

1. Install the necessary dependencies using npm or yarn:

   ```bash
   npm install
   ```

### Run the Development Server

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5000` to view the application.

### Build for Production

1. To build the application for production, run:

   ```bash
   npm run build
   ```

2. The production build will be output to the `public` directory, and you can deploy it to your preferred hosting service.

## Usage Examples
### Browsing Products
Upon loading the application, you will be presented with a grid of products. You can browse through the products, view their images, prices, categories, and ratings.

### Filtering Products by Category
To filter products by category, use the dropdown menu at the top of the page. Select a category, and the products will be filtered accordingly.

### Searching for Products
To search for a specific product, enter a keyword in the search input field and click the "Search" button. The products will be filtered based on the search query.

### Sorting Products by Price
To sort products by price, use the sorting dropdown menu. You can sort products in ascending or descending order, or reset to the default order.

### Resetting Filters and Sorting
To reset all filters and sorting options, click the "Reset" button. This will clear the search query, selected category, and sort order.

### Adding to Favorites and Cart
You can mark a product as a favorite by clicking the heart icon on the product card. To add a product to the cart, click the "Add To Cart" button.

## Acknowledgments

- **Fake Store API**: For providing the mock data used in this project.
- **Tailwind CSS**: For the utility-first approach to styling.
