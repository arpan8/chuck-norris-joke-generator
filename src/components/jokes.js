import { useEffect, useState } from "react"
import axiosInstance from "../utilis/axios"
import { Grid, Card, CardContent, Typography, Container, Box, Chip, Button } from '@mui/material';
import Loader from "./loader";
import { toast } from "react-toastify";

const Jokes = () => {

    const [jokesCategory, setJokesCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState({
        id: null,
        value: null,
        categories: []
    })
    const [loading, setLoading] = useState(true)

    const getJokesCategories = async () => {
        try {
            const res = await axiosInstance.get('/categories')
            setJokesCategory(res.data)
            setLoading(false)
            toast.success('Jokes categories fetched successfully')
        } catch (error) {
            toast.error('Jokes category not found')
        }

    }

    const selectCard = async (cardValue) => {
        try {
            const res = await axiosInstance.get(`/random?category=${cardValue}`)
            const { id, value, categories } = res.data

            setSelectedCategory({
                id, value, categories
            })
            toast.success('Joke fetched successfully')
        } catch (error) {
            console.log(error)
            toast.error('Joke not found')
        }

    }

    const resetForNewJoke = () => {
        setSelectedCategory({
            id: null, value: null, categories: []
        })
    }


    useEffect(() => {
        getJokesCategories()
    }, [])
    return (
        <>
            <Container style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#f0f0f0',
                padding: '2rem'
            }}>
                <Typography variant="h4" gutterBottom style={{ marginBottom: '2rem' }}>
                    Chuck Norris Joke Generator
                </Typography>
                {loading ? <Loader />
                    : <>
                        <Grid container spacing={2}>
                            {jokesCategory.map((card, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                    <Card
                                        style={{ cursor: 'pointer ' }}
                                        sx={{ '&:hover': { boxShadow: 3 } }}
                                        onClick={() => { selectCard(card) }}
                                    >
                                        <CardContent>
                                            <Typography variant="h6" component="div">
                                                {card.toUpperCase()}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        {selectedCategory.id && <Box mt={4} sx={{ p: 2, border: '1px dashed grey' }}>
                    <Typography variant="h5" gutterBottom>
                        {selectedCategory.categories.map((category) => (
                            <Chip
                                label={category.toUpperCase()}
                                color="primary"
                                sx={{
                                    borderRadius: '4px'
                                }}
                            />
                        ))}
                    </Typography>
                    <Typography variant="body1">
                        {selectedCategory.value}
                    </Typography>
                </Box>
                }
                <Box mt={4}>
                    <Button variant="contained" onClick={resetForNewJoke}>Reset</Button>
                </Box>
                    </>
                }

               


            </Container>

        </>
    )
}

export default Jokes