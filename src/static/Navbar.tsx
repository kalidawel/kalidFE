import { AppBar, Container, Toolbar, Typography, Box, Button } from "@mui/material"
import { Link } from "react-router-dom"

const pages = [ 
    {name:"Employee index", url: "/employee-index"}, 
    {name:"Company Index", url:"/company-index"} 
]

const Navbar = () => {
    return(
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to={"/"}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            sx={{
                            mr: 2,
                            display: { xs: 'flex'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                    </Link>
                <Box sx={{ flexGrow: 1, display: 'flex'  }}>
                    {pages.map((page) => (
                        <Link key={page.name} to={page.url}>
                            <Button
                                
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        </Link>
                    ))}
                </Box>
                
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar