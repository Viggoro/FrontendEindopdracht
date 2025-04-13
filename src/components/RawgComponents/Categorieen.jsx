import React from 'react';
import './Categorieen.css';

function Categorieen({ setCategory, activeCategory }) {
    const categories = [
        { id: 'new', name: 'Nieuw' },
        { id: 'popular', name: 'Populair' },
        { id: 'free', name: 'Gratis' }
    ];

    return (
        <div>
            <h2 className={"Categorieen"}>‎ ‎ Categorieën‎ ‎ ‎</h2>
            {categories.map((category) => (
                <p
                    key={category.id}
                    className={`category-item ${activeCategory === category.id ? 'selected' : ''}`}
                    onClick={() => setCategory(category.id)}
                >
                    {category.name}
                </p>
            ))}
        </div>
    );
}

export default Categorieen;