<?php

const NOT_FOUND_STRING = 'Описание для данного товара не найдено';

$name = $_GET['name'];

$products  = [
    'Картошка' => 'Описание картошки',
    'Лук' => 'Описание лука',
    'Капуста' => 'Описание капусты'

];

$description = isset($products[$name]) ?  $products[$name] : NOT_FOUND_STRING;

echo $description;