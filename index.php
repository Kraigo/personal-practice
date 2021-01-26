<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kraigo's Web</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">

</head>
<body>
    <?php
        $dirs = array_filter(glob('*'), 'is_dir');
        foreach ($dirs as $dir) {
    ?>

    <div class="list-group">
        <a href="/<?php echo $dir; ?>" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">
                <?php echo $dir; ?>
            </h5>
          </div>
          <p class="mb-1">

          </p>
        </a>
    </div>
    
    <?php } ?>
    
</body>
</html>