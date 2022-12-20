window.addEventListener('load', () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const a = document.querySelector(`[href="#${entry.target.id}"]`);
        if (entry.isIntersecting) {
          a.classList.add('active');
        } else {
          a.classList.remove('active');
        }
      });
    });

    // 以此類推，監測其他 div
    const portfolio = document.querySelector('#portfolio');
    observer.observe(portfolio);
    const process = document.querySelector('#process');
    observer.observe(process);

    const problem = document.querySelector('#problem');
    observer.observe(problem);
    const contactMe = document.querySelector('#contactMe');
    observer.observe(contactMe);
  
    
  });