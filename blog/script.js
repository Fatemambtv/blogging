document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    // Sample blog posts data (in a real site, this would come from a database or API)
    const blogPosts = [
        {
            id: 1,
            title: 'The Ultimate Guide to Choosing the Perfect Laptop in 2023',
            excerpt: 'Finding the right laptop can be overwhelming with so many options available. This comprehensive guide breaks down everything you need to know before making your purchase.',
            category: 'Tech',
            date: 'June 15, 2023',
            readTime: '8 min read',
            image: 'images/laptop-guide.jpg',
            featured: true
        },
        {
            id: 2,
            title: 'Top 5 Smartphones of 2023',
            excerpt: 'Looking for a new smartphone? Check out our top picks for 2023, featuring the best cameras, performance, and battery life.',
            category: 'Tech',
            date: 'May 28, 2023',
            readTime: '6 min read',
            image: 'images/smartphone-review.jpg',
            featured: false
        },
        {
            id: 3,
            title: 'Creating the Perfect Home Office',
            excerpt: 'Transform any space into a productive work environment with these essential tips and product recommendations.',
            category: 'Lifestyle',
            date: 'April 15, 2023',
            readTime: '5 min read',
            image: 'images/home-office.jpg',
            featured: false
        },
        {
            id: 4,
            title: 'Best Wireless Earbuds Under $100',
            excerpt: 'Quality audio doesn\'t have to break the bank. Discover our top picks for affordable wireless earbuds.',
            category: 'Reviews',
            date: 'March 22, 2023',
            readTime: '7 min read',
            image: 'images/wireless-earbuds.jpg',
            featured: false
        },
        {
            id: 5,
            title: 'Essential Kitchen Gadgets for Healthy Cooking',
            excerpt: 'Make healthy cooking easier and more enjoyable with these must-have kitchen tools and appliances.',
            category: 'Products',
            date: 'February 10, 2023',
            readTime: '6 min read',
            image: 'images/kitchen-gadgets.jpg',
            featured: false
        },
        {
            id: 6,
            title: 'How to Build a Smart Home on a Budget',
            excerpt: 'Transform your home into a smart home without spending a fortune with these affordable devices and tips.',
            category: 'Tech',
            date: 'January 5, 2023',
            readTime: '9 min read',
            image: 'images/smart-home.jpg',
            featured: false
        }
    ];
    
    // Load recent posts on homepage
    const recentPostsContainer = document.getElementById('recent-posts');
    if (recentPostsContainer) {
        // Filter out the featured post
        const nonFeaturedPosts = blogPosts.filter(post => !post.featured);
        
        // Display the first 3 non-featured posts
        nonFeaturedPosts.slice(0, 3).forEach(post => {
            recentPostsContainer.appendChild(createPostCard(post));
        });
    }
    
    // Load related posts on blog post page
    const relatedPostsContainer = document.getElementById('related-posts');
    if (relatedPostsContainer) {
        // Get current post ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const currentPostId = parseInt(urlParams.get('id')) || 1;
        
        // Get current post category
        const currentPost = blogPosts.find(post => post.id === currentPostId);
        if (currentPost) {
            // Find posts with the same category, excluding the current post
            const relatedPosts = blogPosts
                .filter(post => post.category === currentPost.category && post.id !== currentPostId)
                .slice(0, 2);
            
            relatedPosts.forEach(post => {
                relatedPostsContainer.appendChild(createPostCard(post));
            });
        }
    }
    
    // Load blog post content on post page
    const blogPostContent = document.getElementById('blog-post-content');
    if (blogPostContent && window.location.pathname.includes('post.html')) {
        // Get post ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const postId = parseInt(urlParams.get('id')) || 1;
        
        // Find the post
        const post = blogPosts.find(post => post.id === postId);
        if (post) {
            // Update post metadata
            document.getElementById('post-category').textContent = post.category;
            document.getElementById('post-title').textContent = post.title;
            document.getElementById('post-date').textContent = post.date;
            document.getElementById('post-read-time').textContent = post.readTime;
            document.getElementById('post-image').src = post.image;
            document.getElementById('post-image').alt = post.title;
            
            // Update page title and meta tags
            document.title = `${post.title} - Fattah Blog`;
            document.querySelector('meta[name="description"]').setAttribute('content', post.excerpt);
            document.querySelector('meta[property="og:title"]').setAttribute('content', post.title);
            document.querySelector('meta[property="og:description"]').setAttribute('content', post.excerpt);
            document.querySelector('meta[property="og:image"]').setAttribute('content', `https://fattah.xyz/blog/${post.image}`);
            document.querySelector('meta[property="og:url"]').setAttribute('content', `https://fattah.xyz/blog/post.html?id=${post.id}`);
        }
    }
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
    
    // Category filtering
    const categoryLinks = document.querySelectorAll('.categories a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            filterByCategory(category);
        });
    });
    
    // Helper function to create a post card element
    function createPostCard(post) {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        
        postCard.innerHTML = `
            <div class="post-card-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="post-card-content">
                <span class="category">${post.category}</span>
                <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
                <p class="post-meta">${post.date} • ${post.readTime}</p>
                <p class="excerpt">${post.excerpt}</p>
                <a href="post.html?id=${post.id}" class="read-more">Read More</a>
            </div>
        `;
        
        return postCard;
    }
    
    // Search function
    function performSearch(query) {
        if (!query.trim()) return;
        
        query = query.toLowerCase();
        
        // Filter posts based on search query
        const searchResults = blogPosts.filter(post => 
            post.title.toLowerCase().includes(query) || 
            post.excerpt.toLowerCase().includes(query) ||
            post.category.toLowerCase().includes(query)
        );
        
        // Display search results
        const recentPostsContainer = document.getElementById('recent-posts');
        if (recentPostsContainer) {
            // Clear current posts
            recentPostsContainer.innerHTML = '';
            
            if (searchResults.length > 0) {
                // Update section title
                document.querySelector('.section-title').textContent = `Search Results for "${query}"`;
                
                // Display search results
                searchResults.forEach(post => {
                    recentPostsContainer.appendChild(createPostCard(post));
                });
            } else {
                // No results found
                document.querySelector('.section-title').textContent = `No Results Found for "${query}"`;
                
                const noResults = document.createElement('p');
                noResults.textContent = 'Try different keywords or browse categories instead.';
                recentPostsContainer.appendChild(noResults);
            }
        }
    }
    
    // Category filter function
    function filterByCategory(category) {
        // Filter posts by category
        const filteredPosts = blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
        
        // Display filtered posts
        const recentPostsContainer = document.getElementById('recent-posts');
        if (recentPostsContainer) {
            // Clear current posts
            recentPostsContainer.innerHTML = '';
            
            // Update section title
            document.querySelector('.section-title').textContent = `${category} Posts`;
            
            // Display filtered posts
            filteredPosts.forEach(post => {
                recentPostsContainer.appendChild(createPostCard(post));
            });
        }
    }
});