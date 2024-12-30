// It should  have a big image , below that image it should have a title and a description ,below that i should have a button to buy it 
import React from 'react';

const Webdev = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <img 
                src="/photos/placeholder_img.webp" 
                alt="Web Development Course" 
                style={{ width: '50%', height: '50%' }} 
            />
            <h1>Web Development Course</h1>
            <p>This course will teach you the fundamentals of web development, including HTML, CSS, and JavaScript.</p>
            <button 
                style={{ 
                    padding: '10px 20px', 
                    fontSize: '16px', 
                    backgroundColor: '#007BFF', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer' 
                }}
            >
                Buy Now
            </button>
        </div>
    );
};

export default Webdev;