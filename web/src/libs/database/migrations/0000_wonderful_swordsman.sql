CREATE TABLE `carts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`product_id` integer NOT NULL,
	`quantity` integer NOT NULL,
	`total_price` real NOT NULL,
	`time` text DEFAULT (CURRENT_TIME),
	`date` text DEFAULT (CURRENT_DATE),
	`time_stamp` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `order_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_id` integer NOT NULL,
	`cart_id` integer NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`address` text,
	`status` text DEFAULT 'queued' NOT NULL,
	`total_price` real NOT NULL,
	`time` text DEFAULT (CURRENT_TIME),
	`date` text DEFAULT (CURRENT_DATE),
	`time_stamp` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_type` text NOT NULL,
	`product` text NOT NULL,
	`price` real NOT NULL,
	`quantity` integer NOT NULL,
	`time` text DEFAULT (CURRENT_TIME),
	`date` text DEFAULT (CURRENT_DATE),
	`time_stamp` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_product_unique` ON `products` (`product`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`contact_number` integer NOT NULL,
	`user_type` text DEFAULT 'customer' NOT NULL,
	`time` text DEFAULT (CURRENT_TIME),
	`date` text DEFAULT (CURRENT_DATE),
	`time_stamp` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);