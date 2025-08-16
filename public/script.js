document.addEventListener('DOMContentLoaded', () => {
    const coursesContainer = document.getElementById('courses-container');
    const categoryFilter = document.getElementById('category-filter');
    const levelFilter = document.getElementById('level-filter');
    
    // Use the same origin for API calls
    const API_BASE_URL = '';  // Empty string uses same domain

    const renderCourses = (courses) => {
        coursesContainer.innerHTML = '';

        if (courses.length === 0) {
            coursesContainer.innerHTML = `<p class="text-gray-500 col-span-full text-center">No courses found matching your criteria.</p>`;
            return;
        }

        courses.forEach(course => {
            const courseCard = `
                <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-2">
                            <h2 class="text-xl font-bold text-gray-900">${course.title}</h2>
                            <span class="text-xs font-semibold ${
                                course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                                course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            } px-2 py-1 rounded-full">${course.level}</span>
                        </div>
                        <p class="text-sm text-indigo-600 font-semibold mb-3">${course.category}</p>
                        <p class="text-gray-700 text-sm">${course.description}</p>
                    </div>
                </div>
            `;
            coursesContainer.innerHTML += courseCard;
        });
    };

    const fetchCourses = async () => {
        const category = categoryFilter.value;
        const level = levelFilter.value;

        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (level) params.append('level', level);
        
        const queryString = params.toString();
        const url = `${API_BASE_URL}/api/courses${queryString ? '?' + queryString : ''}`;

        coursesContainer.innerHTML = `<p class="text-gray-500 col-span-full text-center">Loading courses...</p>`;

        try {
            const response = await fetch(url);
            console.log('Response status:', response.status); // Debug log
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const courses = await response.json();
            console.log('Courses received:', courses); // Debug log
            renderCourses(courses);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
            coursesContainer.innerHTML = `<p class="text-red-500 col-span-full text-center">Error: Could not load courses. Please make sure the server is running.</p>`;
        }
    };

    categoryFilter.addEventListener('change', fetchCourses);
    levelFilter.addEventListener('change', fetchCourses);

    fetchCourses();
});
