$(document).ready(function(){
    $('.materialboxed').materialbox();
    
    $('.tooltipped').tooltip();
    
    $('#clickMeButton').click(function(){
        $('#heading').fadeOut(300, function(){
            $(this).text('You clicked the button!').fadeIn(300);
        });
        
        M.toast({html: 'Button clicked!', classes: 'rounded green'});
        
        $(this).html('<i class="material-icons left">check</i>Clicked!');
        
        $('.materialboxed-image').addClass('pulse');
        setTimeout(function(){
            $('.materialboxed-image').removeClass('pulse');
        }, 1000);
        
        let clickCount = parseInt($(this).data('clicks') || 0) + 1;
        $(this).data('clicks', clickCount);
        
        if (clickCount > 1) {
            M.toast({html: `Clicked ${clickCount} times!`, classes: 'rounded blue'});
        }
    });
    
    $('.materialboxed-image').hover(
        function(){
            $(this).addClass('scale-in');
        },
        function(){
            $(this).removeClass('scale-in');
        }
    );
    
    $('.materialboxed-image').click(function(){
        M.toast({html: 'Image clicked!', classes: 'rounded orange'});
    });
    
    $(document).keypress(function(e){
        if(e.which == 13 || e.which == 32) {
            $('#clickMeButton').click();
        }
    });
    
    $('.main-body').hide().fadeIn(1000);
    
    $('a[href^="#"]').click(function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
    });
    
    $('img').on('error', function(){
        $(this).attr('src', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==');
        $(this).addClass('placeholder-image');
    });
    
    $('#clickMeButton').on('click', function(){
        let $btn = $(this);
        let originalText = $btn.html();
        
        $btn.html('<i class="material-icons left">hourglass_empty</i>Loading...');
        $btn.prop('disabled', true);
        
        setTimeout(function(){
            $btn.html('<i class="material-icons left">check</i>Clicked!');
            $btn.prop('disabled', false);
        }, 500);
    });
}); 