using AutoMapper;
using Domain.DTOs;
using Domain.Entities;
using Domain.Entities.Junctions;
using Domain.Entities.Profiles;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();

        CreateMap<Activity, ActivityDto>()
            .ForMember(
                d => d.HostUsername, 
                o => o.MapFrom(s =>
                    s.Attendees.FirstOrDefault(a => a.IsHost)!.User.UserName)
            );
        
        CreateMap<ActivityAttendee, UserProfile>()
            .ForMember(d => d.DisplayName, 
                o => o.MapFrom(s =>
                    s.User.DisplayName)
            )
            .ForMember(d => d.Username, 
                o => o.MapFrom(s =>
                    s.User.UserName)
            )
            .ForMember(d => d.Biography, 
                o => o.MapFrom(s =>
                    s.User.Biography)
            );

        CreateMap<User, UserProfile>()
            .ForMember(d => d.ImageUri, o => o.MapFrom(s =>
                s.Images.FirstOrDefault(i => i.IsMain)!.Uri));
    }
}