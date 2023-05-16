<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="studen_index.css">
</head>
<body>
<h1 class="welcome"> welcome to training and placement</h1>
<hr>
<div class="nav-bar">
   <div class="dropdown">
    <div class="menu">
        <button class="dropbtn">
            menu
        </button>
        <div class="dropdown-content">
            <a href="student_index.php">home</a>
            <a href="profile.php">profile</a>
            <a href="training.php">training</a>
            <a href="hire.php">company</a>
            <a href="capllied.php">company applied </a>
            <a href="https://www.overleaf.com/latex/templates/indian-institute-of-technology-bombay-resume/fgnpzhygqxrq">create your resume</a>
            <a href="index.php">logout</a>
        </div>
    </div>
    </div>
    <div class="name">
       
        <?php
        echo $_SESSION['NAME'];
        ?>
    </div>
   
</div>
<div class="upload">
    <form action="uploadp.php" method="post">
        <input type="text" name="text" placeholder="enter something">
        <button type="submit" name="submit">
            post
        </button>
    </form>
</div>

    <?php
        $connection=mysqli_connect('localhost','root','','user');
        $query="SELECT * FROM POST";
         $result=mysqli_query($connection,$query);
        while($row=mysqli_fetch_assoc($result))
        {
            ?>
            <div class="getc">
                <?php echo $row['name']; ?>
                <br>
                <div class="content">
                    <?php echo $row['post']; ?>
                </div>
            </div>
        <?php
        }
    ?>
</body>
</html>