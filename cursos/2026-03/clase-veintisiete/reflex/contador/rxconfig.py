import reflex as rx

config = rx.Config(
    app_name="contador",
    plugins=[
        rx.plugins.SitemapPlugin(),
        rx.plugins.TailwindV4Plugin(),
    ]
)