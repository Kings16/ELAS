from sqlalchemy import Column, String, Integer, ForeignKey, Boolean
from entities.e3_entity.e3_rating import E3_Rating
from orm_interface.base import Base
from sqlalchemy.orm import relationship



class E3_Courses(Base):
    __tablename__ = "e3_courses"

    id = Column(Integer, primary_key=True, autoincrement=True)
    selected = Column(Boolean)
    name = Column(String)
    url = Column(String)
    catalog = Column(String)
    type = Column(String)
    sws= Column(Integer) 
    num_expected_participants = Column(Integer) 
    max_participants = Column(Integer) 
    credit = Column(Integer) 
    language = Column(String)
    description = Column(String)
    location = Column(String)
    exam_type = Column(String)
    time_manual = Column(String)
    ausgeschlossen_ingenieurwissenschaften_bachelor = Column(String)
    e3_rating = relationship(E3_Rating, backref="e3_courses")
 
    def __init__(self, selected, name, url, catalog, subject_type, 
                    sws, num_expected_participants, 
                    max_participants, credit,language,
                    description, location, exam_type, time_manual,
                    ausgeschlossen_ingenieurwissenschaften_bachelor):
        self.selected = selected
        self.name = name
        self.url = url
        self.catalog = catalog
        self.subject_type = subject_type
        self.sws = sws
        self.num_expected_participants = num_expected_participants
        self.max_participants = max_participants
        self.credit = credit
        self.language = language
        self.description = description
        self.location = location
        self.exam_type = exam_type
        self.time_manual = time_manual
        self.ausgeschlossen_ingenieurwissenschaften_bachelor = ausgeschlossen_ingenieurwissenschaften_bachelor